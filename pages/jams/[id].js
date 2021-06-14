import { useRouter } from "next/router";
import ToMain from "../../components/shared/ToMain";

const jam = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div>This is a jam #{id}</div>
      <ToMain />
    </>
  );
};

export default jam;
