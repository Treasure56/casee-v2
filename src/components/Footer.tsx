export default function Footer() {
    return (
        <footer className="bg-card border-t border-border text-muted-foreground flex items-center justify-center py-4">
            <p className="text-sm">
                Copyright &copy; {new Date().getFullYear()} All rights reserved.
            </p>
        </footer>
    );
}
