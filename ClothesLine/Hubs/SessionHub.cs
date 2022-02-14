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
            connections.Add(Context.ConnectionId, sessionId, name);
            await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);

            var groupMembers = connections.GetBySession(sessionId);
            var payload = JsonSerializer.Serialize(groupMembers, typeof(IEnumerable<ConnectedClient>));

            await Clients.Group(sessionId).SendAsync(Methods.NotifyUpdatedClients, payload);
        }

        public async Task SendEstimate(string sessionId, int estimate)
        {
            await Clients.Group(sessionId).SendAsync(Methods.ReceiveEstimate, estimate);
        }

        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            connections.Remove(Context.ConnectionId);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
