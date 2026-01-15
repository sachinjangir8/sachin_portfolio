import { Navbar } from '@/components/public/Navbar';
import { Hero } from '@/components/public/Hero';
import { About } from '@/components/public/About';
import { TechStack } from '@/components/public/TechStack';
import { Qualifications } from '@/components/public/Qualifications';
import { Projects } from '@/components/public/Projects';
import { serverApiRequest } from '@/lib/api';

async function getProfile() {
  try {
    const data = await serverApiRequest<{ profile: any }>('/api/profile');
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
