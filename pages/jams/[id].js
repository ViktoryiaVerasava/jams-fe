import { useRouter } from "next/router";

const jam = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div>This is a jam #{id}</div>
    </>
  );
};

export default jam;
