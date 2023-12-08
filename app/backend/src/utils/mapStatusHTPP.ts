export type StatusHTTP = 'ok' | 'created' | 'noContent' | 'serverError' | 'unprocessableEntity'
| 'badRequest' | 'unauthorized' | 'notFound';

function mapStatusHTTP(status: StatusHTTP): number {
  const statusHTTP = {
    ok: 200,
    created: 201,
    noContent: 204,
    badRequest: 400,
    unprocessableEntity: 422,
    serverError: 500,
    unauthorized: 401,
    notFound: 404,
  };
  return statusHTTP[status] ?? 500;
}

export default mapStatusHTTP;
