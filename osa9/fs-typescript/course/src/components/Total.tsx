interface TotalExercisesProps {
  total: number;
}

const Total = (props: TotalExercisesProps) => {
  return (
    <p>Number of exercises: {props.total}</p>
  )
};

export default Total;