//Comienza con mayusculas por que es un functional components
import NextLink from "next/link";
import {
  AppBar,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
  Badge,
} from "@mui/material";
import { Box } from "@mui/system";
import { SearchOutlined, ShoppingCartOutlined} from "@mui/icons-material";

export const Navbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref legacyBehavior>
          <Link display={"flex"} alignItems="center">
            <Typography variant="h6">Teslo |</Typography>
            <Typography sx={{ marginLeft: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        {/* flex */}
    
          {/* Es como un div que nos ofrece tener acceso al tema principal de la app*/}
          <Box sx={{display: {xs: 'none', sm: 'block'} }}>
            <NextLink href="/category/men" passHref legacyBehavior>
                <Link>
                <Button>Hombres</Button>
                </Link>
            </NextLink>

            <NextLink href="/category/women" passHref legacyBehavior>
                <Link>
                <Button>Mujer</Button>
                </Link>
            </NextLink>

            <NextLink href="/category/kid" passHref legacyBehavior>
                <Link>
                <Button>Niños</Button>
                </Link>
            </NextLink>
          </Box>

        <Box flex={1} />

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href="/category/men" passHref legacyBehavior>
          <Link>
            <IconButton>
                <Badge badgeContent={2} color='secondary'>
                    <ShoppingCartOutlined />
                </Badge>
                
            </IconButton>
          </Link>
        </NextLink>

        <Button>
            Menú
        </Button>


      </Toolbar>
    </AppBar>
  );
};
