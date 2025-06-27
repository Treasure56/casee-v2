export default function Footer() {
    return (
        <footer className="bg-brand-secondary text-neutral-300 flex items-center justify-center py-4">
            <p className="text-sm">
                Copyright &copy; {new Date().getFullYear()} All rights reserved.
            </p>
        </footer>
    );
}
