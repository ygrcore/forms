import { useAppSelector } from '../store/hooks';
import { FormData } from '../components/RHForm/RHForm';

const MainPage = () => {
  const { form } = useAppSelector((state) => state.form);
  console.log(form);
  return (
    <>
      <h1>Main Page</h1>
      <ul>
        {form.map((item: FormData, idx) => (
          <li key={idx}>
            {item.name}, {item.age}, {item.country}, {item.email}, {item.gender}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MainPage;
