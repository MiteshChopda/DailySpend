
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const Icons = {
  Add: AddIcon,
  Remove: RemoveIcon,
  Taxi: LocalTaxiIcon,
  Food: FastfoodIcon,
  Shopping: ShoppingCartIcon,
};

export type IconName = keyof typeof Icons;
export default Icons
