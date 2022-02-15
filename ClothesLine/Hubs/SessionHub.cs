using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Methods = ClothesLine.Hubs.SignalRMethods.Session;

namespace ClothesLine.Hubs
{
    public class SessionHub : Hub
    {
        private readonly ConnectionMapper connections;

        public SessionHub(ConnectionMapper connections)
        {
            this.connections = connections;
        }

        public async Task JoinSession(string sessionId, string name)
        {
            if (name.Equals("andy", StringComparison.InvariantCultureIgnoreCase))
            {
                name = "Candy";
            }

            connections.Add(Context.ConnectionId, sessionId, name);
            await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);
            await UpdateGroup(sessionId);
        }

        public async Task RequestData(string sessionId)
        {
            var groupMembers = connections.GetBySession(sessionId);
            var payload = JsonSerializer.Serialize(groupMembers, typeof(IEnumerable<ConnectedClient>));

            await Clients.Caller.SendAsync(Methods.NotifyUpdatedClients, payload);
        }

        public async Task SendEstimate(string sessionId, int estimate)
        {
            connections.SetEstimate(Context.ConnectionId, estimate);
            await Clients.Group(sessionId).SendAsync(Methods.ReceiveEstimate, Context.ConnectionId, estimate);
        }

        public async Task ClearEstimates(string sessionId)
        {
            connections.ClearEstimates(sessionId);
            await Clients.Group(sessionId).SendAsync(Methods.ClearEstimates);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            connections.Remove(Context.ConnectionId, out var connection);
            await UpdateGroup(connection.Session);
            await base.OnDisconnectedAsync(exception);
        }

        private async Task UpdateGroup(string sessionId)
        {
            var groupMembers = connections.GetBySession(sessionId);
            var payload = JsonSerializer.Serialize(groupMembers, typeof(IEnumerable<ConnectedClient>));

            await Clients.Group(sessionId).SendAsync(Methods.NotifyUpdatedClients, payload);
        }
    }
}
