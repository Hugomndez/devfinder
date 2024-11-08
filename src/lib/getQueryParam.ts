function getQueryParam<T extends { q?: string | string[] }>(params: T): string | undefined {
  const queryParam = params.q;

  return Array.isArray(queryParam) ? queryParam[0] : queryParam;
}

export default getQueryParam;
