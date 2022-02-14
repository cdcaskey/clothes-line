using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace ClothesLine.Hubs
{
    public class ConnectionMapper
    {
        private readonly ConcurrentDictionary<string, ConnectedClient> connections = new ConcurrentDictionary<string, ConnectedClient>();

        public void Add(string connectionId, string session, string name)
        {
            var connection = connections.GetOrAdd(connectionId, key => new ConnectedClient());

            connection.Id = connectionId;
            connection.Session = session;
            connection.Name = name;
        }

        public IEnumerable<ConnectedClient> GetBySession(string sessionId) =>
            connections.Values.Where(v => v.Session == sessionId);

        public void Remove(string connectionId)
        {
            connections.TryRemove(connectionId, out _);
        }
    }
}
