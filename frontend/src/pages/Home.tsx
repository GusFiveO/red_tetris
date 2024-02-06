import { withAuth } from '../hoc/AuthHoc';

export const Home = withAuth(() => {
  return <div>HOME</div>;
});
