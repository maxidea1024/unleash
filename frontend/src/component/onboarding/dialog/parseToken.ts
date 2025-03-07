type TokenInfo = {
  project: string;
  environment: string;
  secret: string
}

export const parseToken = (token?: string): TokenInfo | null => {
  if (!token) {
    return null;
  }

  const [project, rest] = token.split(':', 2);
  if (!rest) {
    return null;
  }

  const [environment, secret, ...extra] = rest.split('.');

  // 딱 정해진것 외의 부분이 있을 경우에는 유효하지 않은것으로 간주한다.
  if (project && environment && secret && extra.length === 0) {
    return {
      project,
      environment,
      secret,
    };
  }

  return null;
};
