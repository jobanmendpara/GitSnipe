export enum Action {
  SEND_LINKS = 'sendLinks',
  GET_LINKS = 'getLinks',
};

export type CustomMessage = {
  action: Action.SEND_LINKS,
  payload: {
    links: Array<string>,
  },
} | {
  action: Action.GET_LINKS,
}

