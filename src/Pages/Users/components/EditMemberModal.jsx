import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
X,
User,
Mail,
Phone,
Building2,
CreditCard,
Save,
} from "lucide-react";

import { updateUser, deleteUser } from "../../../Api/userApi.js";
import { getAllBranches } from "../../../Api/branchApi.js";
import { getAllPlans } from "../../../Api/subscriptionApi.js";

const EditMemberModal = ({
isOpen,
onClose,
user,
onSuccess,
}) => {
const [loading, setLoading] =
useState(false);

const [branches, setBranches] =
useState([]);

const [plans, setPlans] =
useState([]);

const [formData, setFormData] =
useState({
fullName: "",
email: "",
mobile: "",
branchId: "",
subscriptionPlanId: "",
isActive: true,
});

useEffect(() => {
if (isOpen) {
fetchDropdownData();
}
}, [isOpen]);

useEffect(() => {
if (user) {
setFormData({
fullName:
user.fullName || "",
email:
user.email || "",
mobile:
user.mobile || "",
branchId:
user.branchId?._id || "",
subscriptionPlanId:
user.subscriptionPlanId?._id ||
"",
isActive:
user.isActive ?? true,
});
}
}, [user]);

const fetchDropdownData =
async () => {
try {
const [
branchRes,
planRes,
] = await Promise.all([
getAllBranches(),
getAllPlans(),
]);


    setBranches(
      branchRes.branches ||
        branchRes.data ||
        []
    );

    setPlans(
      planRes.subscriptions ||
        planRes.plans ||
        planRes.data ||
        []
    );
  } catch (error) {
    console.error(error);
  }
};


const handleChange = (e) => {
const {
name,
value,
type,
checked,
} = e.target;


setFormData((prev) => ({
  ...prev,
  [name]:
    type === "checkbox"
      ? checked
      : value,
}));


};

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("USER ID:", user?._id);
  console.log("FORM DATA:", formData);

  try {
    setLoading(true);

    const response = await updateUser(
      user._id,
      formData
    );

    console.log(
      "UPDATE RESPONSE:",
      response
    );

    onSuccess?.();

    onClose();
  } catch (error) {
    console.error(
      "UPDATE ERROR:",
      error.response?.data ||
        error.message
    );
  } finally {
    setLoading(false);
  }
};

if (!isOpen) return null;

return ( <AnimatePresence>
<motion.div
initial={{
opacity: 0,
}}
animate={{
opacity: 1,
}}
exit={{
opacity: 0,
}}
className="
fixed inset-0 z-50
bg-black/60
backdrop-blur-sm


      flex items-center
      justify-center

      p-4
    "
  >
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        y: 30,
      }}
      transition={{
        duration: 0.25,
      }}
      className="
        w-full
        max-w-4xl

        rounded-3xl

        bg-white
        dark:bg-[#070B1A]

        border
        border-gray-200
        dark:border-white/10

        shadow-2xl

        overflow-hidden
      "
    >
      {/* HEADER */}
      <div
        className="
          flex items-center
          justify-between

          px-6 py-5

          border-b
          border-gray-200
          dark:border-white/10
        "
      >
        <div>
          <h2
            className="
              text-2xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            Edit Member
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
              dark:text-gray-400
            "
          >
            Update member
            information
          </p>
        </div>

        <button
          onClick={onClose}
          className="
            p-2
            rounded-xl

            hover:bg-gray-100
            dark:hover:bg-white/10

            transition-all
          "
        >
          <X size={20} />
        </button>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="p-6"
      >
        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >
          {/* FULL NAME */}
          <div>
            <label
              className="
                mb-2 block
                text-sm
                font-medium
              "
            >
              Full Name
            </label>

            <div
              className="
                flex items-center gap-3

                px-4 py-3

                rounded-2xl

                border
                border-gray-200
                dark:border-white/10

                bg-gray-50
                dark:bg-[#02045D]/20
              "
            >
              <User size={18} />

              <input
                type="text"
                name="fullName"
                value={
                  formData.fullName
                }
                onChange={
                  handleChange
                }
                className="
                  bg-transparent
                  outline-none
                  w-full
                "
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label
              className="
                mb-2 block
                text-sm
                font-medium
              "
            >
              Email
            </label>

            <div
              className="
                flex items-center gap-3

                px-4 py-3

                rounded-2xl

                border
                border-gray-200
                dark:border-white/10

                bg-gray-50
                dark:bg-[#02045D]/20
              "
            >
              <Mail size={18} />

              <input
                type="email"
                name="email"
                value={
                  formData.email
                }
                onChange={
                  handleChange
                }
                className="
                  bg-transparent
                  outline-none
                  w-full
                "
              />
            </div>
          </div>

          {/* MOBILE */}
          <div>
            <label
              className="
                mb-2 block
                text-sm
                font-medium
              "
            >
              Mobile
            </label>

            <div
              className="
                flex items-center gap-3

                px-4 py-3

                rounded-2xl

                border
                border-gray-200
                dark:border-white/10

                bg-gray-50
                dark:bg-[#02045D]/20
              "
            >
              <Phone size={18} />

              <input
                type="text"
                name="mobile"
                value={
                  formData.mobile
                }
                onChange={
                  handleChange
                }
                className="
                  bg-transparent
                  outline-none
                  w-full
                "
              />
            </div>
          </div>

          {/* BRANCH */}
          <div>
            <label
              className="
                mb-2 block
                text-sm
                font-medium
              "
            >
              Branch
            </label>

            <div
              className="
                flex items-center gap-3

                px-4 py-3

                rounded-2xl

                border
                border-gray-200
                dark:border-white/10

                bg-gray-50
                dark:bg-[#02045D]/20
              "
            >
              <Building2
                size={18}
              />

              <select
                name="branchId"
                value={
                  formData.branchId
                }
                onChange={
                  handleChange
                }
                className="
                  bg-transparent
                  outline-none
                  w-full
                "
              >
                <option value="">
                  Select Branch
                </option>

                {branches.map(
                  (branch) => (
                    <option
                      key={
                        branch._id
                      }
                      value={
                        branch._id
                      }
                    >
                      {
                        branch.branchName
                      }
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* PLAN */}
          <div>
            <label
              className="
                mb-2 block
                text-sm
                font-medium
              "
            >
              Subscription
              Plan
            </label>

            <div
              className="
                flex items-center gap-3

                px-4 py-3

                rounded-2xl

                border
                border-gray-200
                dark:border-white/10

                bg-gray-50
                dark:bg-[#02045D]/20
              "
            >
              <CreditCard
                size={18}
              />

              <select
                name="subscriptionPlanId"
                value={
                  formData.subscriptionPlanId
                }
                onChange={
                  handleChange
                }
                className="
                  bg-transparent
                  outline-none
                  w-full
                "
              >
                <option value="">
                  Select Plan
                </option>

                {plans.map(
                  (plan) => (
                    <option
                      key={
                        plan._id
                      }
                      value={
                        plan._id
                      }
                    >
                      {plan.name}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {/* STATUS */}
          <div
            className="
              flex items-center
              gap-3 mt-8
            "
          >
            <input
              type="checkbox"
              name="isActive"
              checked={
                formData.isActive
              }
              onChange={
                handleChange
              }
              className="
                h-5 w-5
              "
            />

            <span
              className="
                font-medium
              "
            >
              Active Member
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="
            flex justify-end
            gap-3

            mt-8
            pt-6

            border-t
            border-gray-200
            dark:border-white/10
          "
        >
          <button
            type="button"
            onClick={onClose}
            className="
              px-5 py-3

              rounded-2xl

              border
              border-gray-200
              dark:border-white/10
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="
              flex items-center
              gap-2

              px-6 py-3

              rounded-2xl

              bg-gradient-to-r
              from-[#8B0000]
              to-[#F96B00]

              text-white
              font-semibold

              disabled:opacity-50
            "
          >
            <Save size={18} />

            {loading
              ? "Updating..."
              : "Update Member"}
          </button>
        </div>
      </form>
    </motion.div>
  </motion.div>
</AnimatePresence>


);
};

export default EditMemberModal;
