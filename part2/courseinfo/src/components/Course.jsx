const Header = ({ course }) => <h2>{course}</h2>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((part, i) => <Part key={part.id} part={parts[i]} />);

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return (
    <p>
      <b>total of {totalExercises} exercises</b>
    </p>
  );
};

const Course = ({ courses }) => {
  console.log({ courses });
  return (
    <div>
      {courses.map((course) => (
        <>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </>
      ))}
    </div>
  );
};

export default Course;
