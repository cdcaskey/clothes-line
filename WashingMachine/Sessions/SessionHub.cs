using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace WashingMachine.Sessions;

public class SessionHub : Hub
{
    private readonly ConnectionMapper connections;

    public SessionHub(ConnectionMapper connections)
    {
        this.connections = connections;
    }

    public async Task JoinSession(string sessionId, string name, bool spectating, SessionType? style)
    {
        connections.Add(Context.ConnectionId, sessionId, name, spectating, style);
        await Groups.AddToGroupAsync(Context.ConnectionId, sessionId);

        await UpdateGroup(sessionId);
    }

    public async Task SetSpectating(string sessionId, bool spectating)
    {
        connections.SetSpectating(Context.ConnectionId, spectating);
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

    public async Task ShowEstimates(string sessionId)
        => await Clients.Group(sessionId).SendAsync(Methods.ShowEstimates);

    public async Task ClearEstimates(string sessionId)
    {
        connections.ClearEstimates(sessionId);
        await Clients.Group(sessionId).SendAsync(Methods.ClearEstimates);
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        connections.Remove(Context.ConnectionId, out var connection);

        if (connection is not null)
        {
            await UpdateGroup(connection.Session);
        }

        await base.OnDisconnectedAsync(exception);
    }

    private async Task UpdateGroup(string sessionId)
    {
        var groupMembers = connections.GetBySession(sessionId);
        var payload = JsonSerializer.Serialize(groupMembers, typeof(IEnumerable<ConnectedClient>));

        await Clients.Group(sessionId).SendAsync(Methods.NotifyUpdatedClients, payload);
    }

    private static class Methods
    {
        public const string JoinSession = "JoinSession";

        public const string SetSpectating = "SetSpectating";

        public const string NotifyUpdatedClients = "NotifyUpdatedClients";

        public const string RequestData = "RequestData";

        public const string SendEstimate = "SendEstimate";
        public const string ReceiveEstimate = "ReceiveEstimate";
        public const string ShowEstimates = "ShowEstimates";
        public const string ClearEstimates = "ClearEstimates";
    }
}