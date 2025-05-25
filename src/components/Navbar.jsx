export default function Navbar({handleOpen}) {
    console.log("Navbar")
    return (
        <div>
            <div className="container-fluid py-3 border">
                <div className="row align-items-center">
                    <div className="col-4 text-start">
                        <h1 style={{ cursor: "pointer" }} onClick={handleOpen}>More</h1>
                    </div>
                    <div className="col-4 text-center">
                        <h1 className="m-0">Blog.exe</h1>
                    </div>
                    <div className="col-4">
                        <h1 className="px-0 text-end">Your Profile</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}