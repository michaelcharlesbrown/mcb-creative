import HomepageHero from "@/components/HomepageHero";
import { getHomepageHeroSets } from "@/lib/getHomepageHeroSets";

export default async function Home() {
  const sets = await getHomepageHeroSets();
  return <HomepageHero sets={sets} />;
}
