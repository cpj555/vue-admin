const SUCCESS = 0
/**
 * @Message("认证失败")
 */
const ERROR_AUTH_FAILED = 420015

/**
 * @Message("认证过期")
 */
const ERROR_REFRESH_TOKEN = 420016

/**
 * @Message("权限不足")
 */
const POOR_ROLES = 420017

export { SUCCESS, ERROR_AUTH_FAILED, ERROR_REFRESH_TOKEN, POOR_ROLES }
