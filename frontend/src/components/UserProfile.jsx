import { useEffect, useState } from "react";
import {
  FiBookOpen,
  FiHeart,
  FiLogOut,
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileOrders from "./ProfileOrders";

function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");

  const authUser = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");

    if (tab === "orders") {
      setActiveTab("orders");
    } else {
      setActiveTab("profile");
    }
  }, [location.search]);

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  if (!authUser) {
    return null;
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab === "orders") {
      navigate("/user?tab=orders");
    } else {
      navigate("/user");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const initials = authUser.fullname
    ? authUser.fullname
        .split(" ")
        .map((name) => name.charAt(0))
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <main className="min-h-screen bg-white text-[#171717] dark:bg-[#111111] dark:text-[#f5f5f5]">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.16em] text-[#315c4c] dark:text-[#6f9f8b]">
            My account
          </p>
          <h1 className="text-2xl mt-3 font-semibold tracking-tight sm:text-4xl">
            Welcome back, {authUser.fullname?.split(" ")[0] || "Reader"}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666666] dark:text-[#a3a3a3]">
            Manage your profile, orders, cart, and saved books from one place.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <aside className="border border-[#e5e5e5] bg-white dark:border-[#303030] dark:bg-[#181818]">
            <div className="border-b border-[#e5e5e5] p-3 md:p-5 dark:border-[#303030]">
              <div className="flex items-center gap-3">
                {authUser.image ? (
                  <img
                    src={authUser.image}
                    alt={authUser.fullname || "Profile"}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#315c4c] text-sm font-semibold text-white dark:bg-[#6f9f8b] dark:text-[#111111]">
                    {initials}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {authUser.fullname}
                  </p>
                  <p className="truncate text-xs text-[#666666] dark:text-[#a3a3a3]">
                    {authUser.email}
                  </p>
                </div>
              </div>
            </div>

            <nav className="p-2" aria-label="Account navigation">
              <button
                type="button"
                onClick={() => handleTabChange("profile")}
                className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm font-medium transition ${activeTab === "profile" ? "bg-[#f7f7f5] text-[#315c4c] dark:bg-[#1d1d1d] dark:text-[#6f9f8b]" : "text-[#666666] hover:bg-[#f7f7f5] hover:text-[#171717] dark:text-[#a3a3a3] dark:hover:bg-[#1d1d1d] dark:hover:text-[#f5f5f5]"}`}
              >
                <FiUser size={17} />
                Profile
              </button>

              <button
                type="button"
                onClick={() => handleTabChange("orders")}
                className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm font-medium transition ${activeTab === "orders" ? "bg-[#f7f7f5] text-[#315c4c] dark:bg-[#1d1d1d] dark:text-[#6f9f8b]" : "text-[#666666] hover:bg-[#f7f7f5] hover:text-[#171717] dark:text-[#a3a3a3] dark:hover:bg-[#1d1d1d] dark:hover:text-[#f5f5f5]"}`}
              >
                <FiShoppingBag size={17} />
                Orders
              </button>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm font-medium text-[#666666] transition hover:bg-[#f7f7f5] hover:text-[#171717] dark:text-[#a3a3a3] dark:hover:bg-[#1d1d1d] dark:hover:text-[#f5f5f5]"
              >
                <FiShoppingCart size={17} />
                My cart
              </button>

              <button
                type="button"
                onClick={() => navigate("/favourite")}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm font-medium text-[#666666] transition hover:bg-[#f7f7f5] hover:text-[#171717] dark:text-[#a3a3a3] dark:hover:bg-[#1d1d1d] dark:hover:text-[#f5f5f5]"
              >
                <FiHeart size={17} />
                Favourites
              </button>

              <div className="my-2 border-t border-[#e5e5e5] dark:border-[#303030]" />

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20"
              >
                <FiLogOut size={17} />
                Logout
              </button>
            </nav>
          </aside>

          <section className="min-w-0">
            {activeTab === "profile" ? (
              <div className="space-y-6">
                <div className="border border-[#e5e5e5] bg-white dark:border-[#303030] dark:bg-[#181818]">
                  <div className="border-b border-[#e5e5e5] px-5 py-5 dark:border-[#303030] sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center bg-[#f7f7f5] text-[#315c4c] dark:bg-[#1d1d1d] dark:text-[#6f9f8b]">
                        <FiUser size={17} />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">
                          Profile information
                        </h2>
                        <p className="text-xs text-[#666666] dark:text-[#a3a3a3]">
                          Your account details
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-px bg-[#e5e5e5] dark:bg-[#303030] sm:grid-cols-2">
                    <div className="bg-white p-5 dark:bg-[#181818]">
                      <p className="mb-1 text-xs uppercase tracking-wider text-[#999999]">
                        Full name
                      </p>
                      <p className="text-sm font-medium">
                        {authUser.fullname || "Not available"}
                      </p>
                    </div>

                    <div className="bg-white p-5 dark:bg-[#181818]">
                      <p className="mb-1 text-xs uppercase tracking-wider text-[#999999]">
                        Email
                      </p>
                      <p className="break-all text-sm font-medium">
                        {authUser.email || "Not available"}
                      </p>
                    </div>

                    <div className="bg-white p-5 dark:bg-[#181818]">
                      <p className="mb-1 text-xs uppercase tracking-wider text-[#999999]">
                        Account role
                      </p>
                      <p className="text-sm font-medium capitalize">
                        {authUser.role || "User"}
                      </p>
                    </div>

                    <div className="bg-white p-5 dark:bg-[#181818]">
                      <p className="mb-1 text-xs uppercase tracking-wider text-[#999999]">
                        Account status
                      </p>
                      <p className="flex items-center gap-2 text-sm font-medium">
                        <span className="h-2 w-2 rounded-full bg-[#315c4c] dark:bg-[#6f9f8b]" />
                        Active
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="group border border-[#e5e5e5] bg-white p-5 text-left transition hover:border-[#315c4c] dark:border-[#303030] dark:bg-[#181818] dark:hover:border-[#6f9f8b]"
                  >
                    <FiShoppingCart
                      className="mb-5 text-[#315c4c] dark:text-[#6f9f8b]"
                      size={20}
                    />
                    <p className="text-sm font-semibold">My cart</p>
                    <p className="mt-1 text-xs leading-5 text-[#666666] dark:text-[#a3a3a3]">
                      Review items ready for checkout.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/favourite")}
                    className="group border border-[#e5e5e5] bg-white p-5 text-left transition hover:border-[#315c4c] dark:border-[#303030] dark:bg-[#181818] dark:hover:border-[#6f9f8b]"
                  >
                    <FiHeart
                      className="mb-5 text-[#315c4c] dark:text-[#6f9f8b]"
                      size={20}
                    />
                    <p className="text-sm font-semibold">Favourites</p>
                    <p className="mt-1 text-xs leading-5 text-[#666666] dark:text-[#a3a3a3]">
                      Revisit the books you've saved.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTabChange("orders")}
                    className="group border border-[#e5e5e5] bg-white p-5 text-left transition hover:border-[#315c4c] dark:border-[#303030] dark:bg-[#181818] dark:hover:border-[#6f9f8b]"
                  >
                    <FiShoppingBag
                      className="mb-5 text-[#315c4c] dark:text-[#6f9f8b]"
                      size={20}
                    />
                    <p className="text-sm font-semibold">Your orders</p>
                    <p className="mt-1 text-xs leading-5 text-[#666666] dark:text-[#a3a3a3]">
                      View your previous purchases.
                    </p>
                  </button>
                </div>

                <div className="border border-[#e5e5e5] bg-[#f7f7f5] p-5 dark:border-[#303030] dark:bg-[#1d1d1d] sm:p-6">
                  <div className="flex items-start gap-4">
                    <FiBookOpen
                      className="mt-0.5 shrink-0 text-[#315c4c] dark:text-[#6f9f8b]"
                      size={20}
                    />
                    <div>
                      <h3 className="text-sm font-semibold">Keep exploring</h3>
                      <p className="mt-1 text-sm leading-6 text-[#666666] dark:text-[#a3a3a3]">
                        Browse the collection and discover your next favourite
                        book.
                      </p>
                      <button
                        type="button"
                        onClick={() => navigate("/books")}
                        className="mt-4 text-sm font-medium text-[#315c4c] hover:underline dark:text-[#6f9f8b]"
                      >
                        Browse books →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <p className="mb-2 text-sm font-medium text-[#315c4c] dark:text-[#6f9f8b]">
                    Account
                  </p>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Your orders
                  </h2>
                  <p className="mt-1 text-sm text-[#666666] dark:text-[#a3a3a3]">
                    Review your previous purchases and order status.
                  </p>
                </div>

                <ProfileOrders />
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default UserProfile;
