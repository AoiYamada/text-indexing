interface Service {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute(...any: any[]): unknown;
}

export default Service;
