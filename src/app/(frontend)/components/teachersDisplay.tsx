'use client';

import useFetchTeachers from '@/hooks/teachers/useFetchTeachers';
import { TeacherDB } from '@/utils/interfaces';
import MDEditor from '@uiw/react-md-editor';

const TeachersDisplay = () => {
  const { data: teachers, status } = useFetchTeachers();

  if (status != 'success') {
    return <></>;
  }

  return (
    <section>
      <div className="teachers-header">
        <h1>MEET OUR TEAM</h1>
        <h2>~ Of Volunteer Teachers ~</h2>
      </div>

      <div className="teachers-container">
        {teachers.map((teacher: TeacherDB) => (
          <article className="teacher" key={teacher.id}>
            <div className="teacher-pic">
              <img src={teacher.imageUrl} />
            </div>

            <h3>
              {teacher.name.toUpperCase()} ({teacher.pronouns.toUpperCase()})
            </h3>
            <h4>{teacher.position.toUpperCase()}</h4>
            <MDEditor.Markdown source={teacher.description} />
          </article>
        ))}
        {/* <article className="teacher">
          <div className="teacher-pic">
            <img src="images/mist.png" />
          </div>

          <h3>MIST (HE/HIM)</h3>
          <h4>RIGGER / BOTTOM</h4>
          <p>
            Mist is a Bi Switch, who believes that variety is the spice of life
            and loves all aspects of rope. Not only does he enjoy experiencing
            new things, but he also loves helping others explore the joys of
            rope in a safe consensual way.
          </p>
        </article>

        <article className="teacher">
          <div className="teacher-pic">
            <img src="images/quartz.jpg" />
          </div>

          <h3>QUARTZ (THEY/THEM)</h3>
          <h4>RIGGER / BOTTOM</h4>
          <p>
            Quartz is a nonbinary, pansexual, neurodiverse white rope switch,
            who is passionate about exploring the emotional and ritualistic
            aspects of rope bondage. For more about them and to book private
            classes/sessions visit:{' '}
            <Link href="https://quartzqunt.com">quartzqunt.com</Link>
          </p>
        </article>

        <article className="teacher">
          <div className="teacher-pic">
            <img src="images/amethyst.jpg" />
          </div>

          <h3>AMETHYST (SHE/HER)</h3>
          <h4>BOTTOM</h4>
          <p>
            Amethyst is a Trans Lesbian and bottoming skills teacher. She’s been
            an avid bottom for the last 4 years and has learned a myriad of
            lessons that she’s keen to pass on to you! Rope is a two-way street
            and Amethyst wants to make you aware of the power you have while
            being tied and while being as safe as you choose to be.
          </p>
        </article> */}
      </div>
    </section>
  );
};

export default TeachersDisplay;
