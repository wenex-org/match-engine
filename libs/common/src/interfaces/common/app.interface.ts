export type Application = {
  PRODUCER: {
    API_PORT: number;
  };
  CONSUMER: {
    API_PORT: number;
    CLIENT: { ID: string };
    CONSUMER: { GROUP_ID: string };
    PACKAGE: { NAME: string; SYMBOL: symbol };
    SERVICES: { [SERVICE: string]: { NAME: string } };
  };
};
