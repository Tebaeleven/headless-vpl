import { Link, redirect, useNavigate } from '@/router';
import { Button } from '@/components/ui/button';

function index() {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => {
          navigate('/example');
        }}
      >
        Example
      </Button>
    </div>
  );
}

export default index;
