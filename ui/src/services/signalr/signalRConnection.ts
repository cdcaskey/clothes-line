import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export class SignalRConnection {
  private connection: HubConnection | null = null;
  private hubUrl: string;

  constructor(hubUrl: string) {
    this.hubUrl = hubUrl;
  }

  public async start(): Promise<void> {
    if (this.connection) {
      return;
    }

    this.connection = new HubConnectionBuilder()
      .withUrl(this.hubUrl)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    try {
      await this.connection.start();
      console.log('SignalR connection established');
    } catch (error) {
      console.error('Error establishing SignalR connection:', error);
      throw error;
    }
  }

  public async stop(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.stop();
        console.log('SignalR connection stopped');
        this.connection = null;
      } catch (error) {
        console.error('Error stopping SignalR connection:', error);
        throw error;
      }
    }
  }

  public on<T>(methodName: string, callback: (data: T) => void): void {
    if (!this.connection) {
      console.error('SignalR connection not established');
      return;
    }

    this.connection.on(methodName, callback);
  }

  public off(methodName: string): void {
    if (!this.connection) {
      console.error('SignalR connection not established');
      return;
    }

    this.connection.off(methodName);
  }

  public async invoke<T>(methodName: string, ...args: any[]): Promise<T> {
    if (!this.connection) {
      throw new Error('SignalR connection not established');
    }

    try {
      return await this.connection.invoke<T>(methodName, ...args);
    } catch (error) {
      console.error(`Error invoking method ${methodName}:`, error);
      throw error;
    }
  }

  public async send(methodName: string, ...args: any[]): Promise<void> {
    if (!this.connection) {
      throw new Error('SignalR connection not established');
    }

    try {
      await this.connection.send(methodName, ...args);
    } catch (error) {
      console.error(`Error sending method ${methodName}:`, error);
      throw error;
    }
  }

  public getConnectionId(): string | null {
    return this.connection ? this.connection.connectionId : null;
  }

  public isConnected(): boolean {
    return this.connection?.state === 'Connected';
  }
}
