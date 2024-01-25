using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace ClothesLine.Hubs
{
    public class ConnectionMapper
    {
        private readonly ConcurrentDictionary<string, ConnectedClient> connections = new();

        public void Add(string connectionId, string session, string name, bool spectating, EstimationStyle? style)
        {
            var connection = connections.GetOrAdd(connectionId, key => new ConnectedClient());

            connection.Id = connectionId;
            connection.Session = session;
            connection.Name = name;
            connection.Style = style;

            if (spectating)
            {
                connection.Spectating = spectating;
            }
        }

        public IEnumerable<ConnectedClient> GetBySession(string sessionId) =>
            connections.Values.Where(v => v.Session == sessionId);

        public void SetEstimate(string connectionId, int estimate)
        {
            if (connections.TryGetValue(connectionId, out var client))
            {
                client.Estimate = estimate;
            }
        }

        public void SetSpectating(string connectionId, bool spectating)
        {
            if (connections.TryGetValue(connectionId, out var client))
            {
                client.Spectating = spectating;
            }
        }

        public void ClearEstimates(string sessionId)
        {
            foreach (var client in connections.Where(c => c.Value.Session == sessionId))
            {
                client.Value.Estimate = null;
            }
        }

        public void ToggleCandy(string connectionId)
        {
            if (connections.TryGetValue(connectionId, out var client))
            {
                client.IsCandy = !client.IsCandy;
            }
        }

        public void Remove(string connectionId, out ConnectedClient removedConnection)
            => connections.TryRemove(connectionId, out removedConnection);
    }
}
