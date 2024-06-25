import App from '@/app/app';

// GOTCHA: page components must be async. Otherwise the ssr cache may not be initialized correctly.
export default async function Page() {
  return <App />;
}
