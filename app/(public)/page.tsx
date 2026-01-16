import { Navbar } from '@/components/public/Navbar';
import { Hero } from '@/components/public/Hero';
import { About } from '@/components/public/About';
import { TechStack } from '@/components/public/TechStack';
import { Qualifications } from '@/components/public/Qualifications';
import { Projects } from '@/components/public/Projects';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`) ||
  'http://localhost:3000';

async function getProfile() {
  try {
    const res = await fetch(`${BASE_URL}/api/profile/public`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch profile');
    }

    const data = await res.json();
    return data.profile;
  } catch (error) {
    return null;
  }
}

export default async function HomePage() {
  const profile = await getProfile();

  return (
    <div className="min-h-screen">
      <Navbar profile={profile} />
      <Hero profile={profile} />
      <About profile={profile} />
      <TechStack />
      <Qualifications />
      <Projects />
    </div>
  );
}
