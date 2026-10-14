export type AppEnv = 'staging' | 'production';

const API_HOSTS: Record<AppEnv, string> = {
  staging: 'https://pp-processpanda-prod-uks-staging.azurewebsites.net',
  production: 'https://processpanda.app',
};

function resolveAppEnv(value: string | undefined): AppEnv {
  return value === 'production' ? 'production' : 'staging';
}

export const APP_ENV = resolveAppEnv(process.env.EXPO_PUBLIC_APP_ENV);

export const API_BASE_URL = `${API_HOSTS[APP_ENV]}/api`;
