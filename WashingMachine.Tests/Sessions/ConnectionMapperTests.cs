using System.Linq;
using WashingMachine.Sessions;
using Xunit;

namespace WashingMachine.Tests.Sessions
{
    public class ConnectionMapperTests
    {
        [Fact]
        public void Add_AddsConnectionToMapper()
        {
            // Arrange
            var mapper = new ConnectionMapper();
            var connectionId = "connection1";
            var sessionId = "session1";
            var name = "User1";
            var spectating = false;
            var style = SessionType.Days;

            // Act
            mapper.Add(connectionId, sessionId, name, spectating, style);

            // Assert
            var clients = mapper.GetBySession(sessionId).ToList();
            Assert.Single(clients);
            Assert.Equal(connectionId, clients[0].Id);
            Assert.Equal(sessionId, clients[0].Session);
            Assert.Equal(name, clients[0].Name);
            Assert.Equal(spectating, clients[0].Spectating);
            Assert.Equal(style, clients[0].Style);
        }

        [Fact]
        public void Add_WithSpectatingTrue_SetsSpectatingProperty()
        {
            // Arrange
            var mapper = new ConnectionMapper();
            var connectionId = "connection1";
            var sessionId = "session1";
            var name = "User1";
            var spectating = true;
            var style = SessionType.Days;

            // Act
            mapper.Add(connectionId, sessionId, name, spectating, style);

            // Assert
            var clients = mapper.GetBySession(sessionId).ToList();
            Assert.Single(clients);
            Assert.True(clients[0].Spectating);
        }

        [Fact]
        public void GetBySession_ReturnsEmptyCollection_WhenNoClientsInSession()
        {
            // Arrange
            var mapper = new ConnectionMapper();
            var sessionId = "nonexistent";

            // Act
            var result = mapper.GetBySession(sessionId);

            // Assert
            Assert.Empty(result);
        }

        [Fact]
        public void GetBySession_ReturnsOnlyClientsInSpecifiedSession()
        {
            // Arrange
            var mapper = new ConnectionMapper();
            var session1 = "session1";
            var session2 = "session2";

            mapper.Add("conn1", session1, "User1", false, null);
            mapper.Add("conn2", session1, "User2", false, null);
            mapper.Add("conn3", session2, "User3", false, null);

            // Act
            var result = mapper.GetBySession(session1).ToList();

            // Assert
            Assert.Equal(2, result.Count);
            Assert.All(result, client => Assert.Equal(session1, client.Session));
        }

        [Fact]
        public void SetEstimate_UpdatesEstimateForConnection()
        {
            // Arrange
            var mapper = new ConnectionMapper();
            var connectionId = "connection1";
            var sessionId = "session1";
            var estimate = 5;

            mapper.Add(connectionId, sessionId, "User1", false, null);

            // Act
            mapper.SetEstimate(connectionId, estimate);

            // Assert
            var client = mapper.GetBySession(sessionId).Single();
            Assert.Equal(estimate, client.Estimate);
        }

        [Fact]
        public void SetEstimate_DoesNothing_WhenConnectionDoesNotExist()
        {
            // Arrange
            var mapper = new ConnectionMapper();
            var nonExistentConnectionId = "nonexistent";
            var estimate = 5;

            // Act & Assert (no exception should be thrown)
            mapper.SetEstimate(nonExistentConnectionId, estimate);
        }

        [Fact]
        public void SetSpectating_UpdatesSpectatingStatusForConnection()
        {
            // Arrange
            var mapper = new ConnectionMapper();
            var connectionId = "connection1";
            var sessionId = "session1";

            mapper.Add(connectionId, sessionId, "User1", false, null);

            // Act
            mapper.SetSpectating(connectionId, true);

            // Assert
            var client = mapper.GetBySession(sessionId).Single();
            Assert.True(client.Spectating);
        }

        [Fact]
        public void SetSpectating_DoesNothing_WhenConnectionDoesNotExist()
        {
            // Arrange
            var mapper = new ConnectionMapper();
            var nonExistentConnectionId = "nonexistent";

            // Act & Assert (no exception should be thrown)
            mapper.SetSpectating(nonExistentConnectionId, true);
        }

        [Fact]
        public void ClearEstimates_ClearsEstimatesForAllClientsInSession()
        {
            // Arrange
            var mapper = new ConnectionMapper();
            var sessionId = "session1";
            var otherSessionId = "session2";

            mapper.Add("conn1", sessionId, "User1", false, null);
            mapper.Add("conn2", sessionId, "User2", false, null);
            mapper.Add("conn3", otherSessionId, "User3", false, null);

            mapper.SetEstimate("conn1", 3);
            mapper.SetEstimate("conn2", 5);
            mapper.SetEstimate("conn3", 8);

            // Act
            mapper.ClearEstimates(sessionId);

            // Assert
            var sessionClients = mapper.GetBySession(sessionId).ToList();
            Assert.All(sessionClients, client => Assert.Null(client.Estimate));

            var otherSessionClient = mapper.GetBySession(otherSessionId).Single();
            Assert.Equal(8, otherSessionClient.Estimate);
        }

        [Fact]
        public void ToggleCandy_TogglesIsCandyProperty()
        {
            // Arrange
            var mapper = new ConnectionMapper();
            var connectionId = "connection1";
            var sessionId = "session1";

            mapper.Add(connectionId, sessionId, "User1", false, null);
            var initialIsCandy = mapper.GetBySession(sessionId).Single().IsCandy;

            // Act
            mapper.ToggleCandy(connectionId);

            // Assert
            var updatedIsCandy = mapper.GetBySession(sessionId).Single().IsCandy;
            Assert.NotEqual(initialIsCandy, updatedIsCandy);
        }

        [Fact]
        public void ToggleCandy_DoesNothing_WhenConnectionDoesNotExist()
        {
            // Arrange
            var mapper = new ConnectionMapper();
            var nonExistentConnectionId = "nonexistent";

            // Act & Assert (no exception should be thrown)
            mapper.ToggleCandy(nonExistentConnectionId);
        }

        [Fact]
        public void Remove_RemovesConnectionAndReturnsRemovedClient()
        {
            // Arrange
            var mapper = new ConnectionMapper();
            var connectionId = "connection1";
            var sessionId = "session1";
            var name = "User1";

            mapper.Add(connectionId, sessionId, name, false, null);

            // Act
            mapper.Remove(connectionId, out var removedConnection);

            // Assert
            Assert.Empty(mapper.GetBySession(sessionId));
            Assert.NotNull(removedConnection);
            Assert.Equal(connectionId, removedConnection.Id);
            Assert.Equal(sessionId, removedConnection.Session);
            Assert.Equal(name, removedConnection.Name);
        }

        [Fact]
        public void Remove_ReturnsNull_WhenConnectionDoesNotExist()
        {
            // Arrange
            var mapper = new ConnectionMapper();
            var nonExistentConnectionId = "nonexistent";

            // Act
            mapper.Remove(nonExistentConnectionId, out var removedConnection);

            // Assert
            Assert.Null(removedConnection);
        }
    }
}
