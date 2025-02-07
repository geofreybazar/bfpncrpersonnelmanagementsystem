const Recap = () => {
  return (
    <div>
      <div>Bureau of Fire Protection - National Capital Region</div>
      <div className='w-full flex items-center justify-center gap-5 py-10'>
        <div className='border text-center border-turquoise flex flex-col justify-center rounded-md p-2 w-1/6 h-32'>
          <p>Personnel</p>
          <p className='text-2xl font-semibold'>200</p>
        </div>
        <div className='border text-center border-turquoise flex flex-col justify-center rounded-md p-2 w-1/6 h-32'>
          <p>Commissioned Officers</p>
          <p className='text-2xl font-semibold'>56</p>
        </div>
        <div className='border text-center border-turquoise flex flex-col justify-center rounded-md p-2 w-1/6 h-32'>
          <p>Non-Commission Officers</p>
          <p className='text-2xl font-semibold'>140</p>
        </div>
        <div className='border text-center border-turquoise flex flex-col justify-center rounded-md p-2 w-1/6 h-32'>
          <p>Non-Uniformed Personnel</p>
          <p className='text-2xl font-semibold'>4</p>
        </div>
      </div>
    </div>
  );
};

export default Recap;
