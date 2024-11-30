import type { RPA } from "@server/db/schema";

type EditRpaPageProps = {
  rpa: RPA;
};

export function EditRpaPage({ rpa }: EditRpaPageProps) {
  return <pre>{JSON.stringify(rpa, null, 2)}</pre>;
}
