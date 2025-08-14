import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { Button } from './ui/button';
import { Search, ShoppingCart, User } from 'lucide-react';
import MobileNav from './mobile-nav';

export const categories = [
	{ id: 1, name: 'Electronics', href: '/category/electronics' },
	{ id: 2, name: 'Books', href: '/category/books' },
	{ id: 3, name: 'Clothing', href: '/category/clothing' },
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
				{/* asChild help us to use all those predefined classes had to button will be use in Link so in sense we are using button but it is not a button */}
				<div className='flex items-center gap-0'>
					<Button variant='ghost' size='icon' asChild>
						<Link href='/search'>
							<Search className='h-5 w-5' />
						</Link>
					</Button>

					<Button variant='ghost' size='icon' asChild>
						<Link href='/cart'>
							<ShoppingCart className='h-5 w-5' />
						</Link>
					</Button>

					<Button variant='ghost' size='icon' asChild>
						<Link href='/auth'>
							<User className='h-5 w-5' />
						</Link>
					</Button>
					<ModeToggle />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
