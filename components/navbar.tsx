import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import MobileNav from './mobile-nav';
import SearchInput from './search-input';
import CartIndicator from './cart-indicator';
import AuthStatus from './auth-status';

export const categories = [
	{ id: 1, name: 'Electronics', href: '/search/electronics' },
	{ id: 2, name: 'Clothing', href: '/search/clothing' },
	{ id: 3, name: 'Home', href: '/search/home' },
];

const Navbar = () => {
	return (
		<div className='border-b border-dashed'>
			<div className='container mx-auto flex h-16 items-center justify-between'>
				<div>
					<div className='flex items-center md:gap-6 gap-2 '>
						<MobileNav />
						<Link href='/' className='text-2xl font-bold'>
							Store
						</Link>
						<nav className='hidden md:flex items-center pt-1.5 gap-6'>
							{categories.map((category) => (
								<Link
									key={category.id}
									href={category.href}
									className='text-sm font-medium text-muted-foreground hover:text-primary transition-colors'>
									{category.name}
								</Link>
							))}
						</nav>
					</div>
				</div>

				<div className='block w-full mx-4 md:mx-8'>
					<SearchInput />
				</div>

				{/* asChild help us to use all those predefined classes had to button will be use in Link so in sense we are using button but it is not a button */}
				<div className='flex items-center gap-0'>
					<AuthStatus />
					<CartIndicator />
					<ModeToggle />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
