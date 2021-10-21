declare module 'shortlink' {
  const shortlink: {
    generate: (n: number) => string;
    encode: (n: number) => string;
    decode: (n: string) => string;
  };
  export default shortlink;
}
