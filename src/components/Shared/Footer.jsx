const Footer = () => {
    return (
        <div className="bg-base-200">
            <footer className="footer max-w-7xl mx-auto text-base-content p-10">
                <aside>
                    <img src="https://i.ibb.co.com/NY20FBM/language-App.png" alt="" className="w-20 h-20" />
                    <p>
                        Bento Learn.
                        <br />
                        Providing reliable tech since 2024
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
        </div>

    )
}
export default Footer;