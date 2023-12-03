import { useAppSelector } from '../store/hooks';
import { ModifiedFormData } from '../types/common';
import Card from '../components/Card/Card';

const MainPage = () => {
  const { form } = useAppSelector((state) => state.form);

  return (
    <>
      <h1>Main Page</h1>
      <ul>
        {form.map((item: ModifiedFormData, idx) => (
          <Card
            key={idx}
            name={item.name}
            age={item.age}
            country={item.country}
            email={item.email}
            gender={item.gender}
            password={item.password}
            userImage={item.userImage}
            isLatest={idx === form.length - 1}
          />
        ))}
      </ul>
    </>
  );
};

export default MainPage;
