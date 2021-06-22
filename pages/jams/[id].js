import { useRouter } from "next/router";
import TopLink from "../../components/shared/TopLink";

const jam = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div>This is a jam #{id}</div>
      <TopLink />
    </>
  );
};

export default jam;
