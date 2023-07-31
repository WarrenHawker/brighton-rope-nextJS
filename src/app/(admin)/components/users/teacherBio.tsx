import { TeacherBio } from '@/utils/interfaces';

interface TeacherBioProps {
  teacher: TeacherBio;
}

const TeacherBio = ({ teacher }: TeacherBioProps) => {
  return (
    <>
      <h3>Teacher Bio</h3>
    </>
  );
};

export default TeacherBio;
