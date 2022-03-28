export interface IApp {
  settings(): void;

  middlewares(): void;

  routes(): void;

  listen(): Promise<void>;
}
