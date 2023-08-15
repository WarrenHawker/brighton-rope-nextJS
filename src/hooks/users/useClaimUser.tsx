import { Position } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ClaimData {
  accountEmail: string | undefined;
  accountName: string;
  accountPassword: string;
  bio: {
    public: boolean;
    name: string;
    pronouns: string;
    position: Position;
    description: string;
    imageUrl: string;
  };
}

export const claimUser = async (claimData: ClaimData) => {
  const res = await fetch(`/api/auth/new-user`, {
    method: 'PUT',
    body: JSON.stringify(claimData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error();
  }
  return data;
};

const useClaimUser = () => {
  const router = useRouter();
  const { update } = useSession();
  return useMutation<any, Error, ClaimData>(claimUser, {
    onSuccess: async () => {
      await update({ claimed: 'true' });
      router.refresh();
    },
  });
};

export default useClaimUser;
