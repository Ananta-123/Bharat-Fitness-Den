import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Plus,
  Trash2,
  Dumbbell,
  Flame,
  FileText,
  Target,
  Video,
  Image as ImageIcon,
  Upload,
} from "lucide-react";

import {
  muscleGroups,
  equipments,
  difficulties,
} from "../utils/exerciseEnums";

export default function CreateExerciseModal({
  isOpen,
  onClose,
  onSubmit,
}) {
  // ==========================================
  // Initial Form
  // ==========================================

  const initialForm = {
    name: "",
    muscleGroup: muscleGroups[0] || "chest",
    equipment: equipments[0] || "bodyweight",
    difficulty: difficulties[0] || "beginner",
    description: "",
    instructions: [""],
    video: null,
    thumbnail: null,
    caloriesBurnPerMinute: 5,
    isActive: true,
  };

  const [formData, setFormData] =
    useState(initialForm);

  const [loading, setLoading] =
    useState(false);

  const [errors, setErrors] =
    useState({});

  const [videoPreview, setVideoPreview] =
    useState("");

  const [thumbnailPreview, setThumbnailPreview] =
    useState("");

  // ==========================================
  // Reset Form
  // ==========================================

  useEffect(() => {
    if (isOpen) {
      setFormData(initialForm);
      setErrors({});
      setVideoPreview("");
      setThumbnailPreview("");
    }
  }, [isOpen]);

  // ==========================================
  // Input Handler
  // ==========================================

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
          : name ===
            "caloriesBurnPerMinute"
          ? Number(value)
          : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // ==========================================
  // Video File Handler
  // ==========================================

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Optional video type validation
    if (!file.type.startsWith("video/")) {
      setErrors((prev) => ({
        ...prev,
        video:
          "Please select a valid video file.",
      }));

      e.target.value = "";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      video: file,
    }));

    setErrors((prev) => ({
      ...prev,
      video: "",
    }));

    // Preview
    const previewUrl =
      URL.createObjectURL(file);

    setVideoPreview(previewUrl);
  };

  // ==========================================
  // Thumbnail File Handler
  // ==========================================

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Optional image type validation
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        thumbnail:
          "Please select a valid image file.",
      }));

      e.target.value = "";
      return;
    }

    setFormData((prev) => ({
      ...prev,
      thumbnail: file,
    }));

    setErrors((prev) => ({
      ...prev,
      thumbnail: "",
    }));

    // Preview
    const previewUrl =
      URL.createObjectURL(file);

    setThumbnailPreview(previewUrl);
  };

  // ==========================================
  // Instructions
  // ==========================================

  const handleInstructionChange = (
    index,
    value
  ) => {
    const updated = [
      ...formData.instructions,
    ];

    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      instructions: updated,
    }));

    setErrors((prev) => ({
      ...prev,
      instructions: "",
    }));
  };

  // ==========================================
  // Add Instruction
  // ==========================================

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [
        ...prev.instructions,
        "",
      ],
    }));
  };

  // ==========================================
  // Remove Instruction
  // ==========================================

  const removeInstruction = (index) => {
    if (
      formData.instructions.length === 1
    ) {
      return;
    }

    const updated = [
      ...formData.instructions,
    ];

    updated.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      instructions: updated,
    }));
  };

  // ==========================================
  // Validation
  // ==========================================

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "Exercise name is required.";
    }

    if (!formData.muscleGroup) {
      newErrors.muscleGroup =
        "Muscle group is required.";
    }

    if (!formData.equipment) {
      newErrors.equipment =
        "Equipment is required.";
    }

    if (!formData.difficulty) {
      newErrors.difficulty =
        "Difficulty is required.";
    }

    if (
      formData.caloriesBurnPerMinute ===
        "" ||
      Number(
        formData.caloriesBurnPerMinute
      ) < 0
    ) {
      newErrors.caloriesBurnPerMinute =
        "Enter a valid calorie value.";
    }

    if (formData.video) {
      if (
        !formData.video.type.startsWith(
          "video/"
        )
      ) {
        newErrors.video =
          "Please select a valid video file.";
      }
    }

    if (formData.thumbnail) {
      if (
        !formData.thumbnail.type.startsWith(
          "image/"
        )
      ) {
        newErrors.thumbnail =
          "Please select a valid image file.";
      }
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      /*
       * IMPORTANT:
       * Because the backend uses req.files,
       * we need FormData instead of JSON.
       */

      const formDataToSend = new FormData();

      // Basic fields
      formDataToSend.append(
        "name",
        formData.name.trim()
      );

      formDataToSend.append(
        "muscleGroup",
        formData.muscleGroup
      );

      formDataToSend.append(
        "equipment",
        formData.equipment
      );

      formDataToSend.append(
        "difficulty",
        formData.difficulty
      );

      formDataToSend.append(
        "description",
        formData.description.trim()
      );

      formDataToSend.append(
        "caloriesBurnPerMinute",
        String(
          formData.caloriesBurnPerMinute
        )
      );

      formDataToSend.append(
        "isActive",
        String(formData.isActive)
      );

      // Instructions
      const cleanedInstructions =
        formData.instructions.filter(
          (item) => item.trim() !== ""
        );

      cleanedInstructions.forEach(
        (instruction) => {
          formDataToSend.append(
            "instructions",
            instruction.trim()
          );
        }
      );

      // Video file
      if (formData.video) {
        formDataToSend.append(
          "video",
          formData.video
        );
      }

      // Thumbnail file
      if (formData.thumbnail) {
        formDataToSend.append(
          "thumbnail",
          formData.thumbnail
        );
      }

      // Debug
      console.log(
        "CREATE EXERCISE FORM DATA:"
      );

      for (const [
        key,
        value,
      ] of formDataToSend.entries()) {
        console.log(key, value);
      }

      await onSubmit(formDataToSend);

      // Reset
      setFormData(initialForm);
      setErrors({});
      setVideoPreview("");
      setThumbnailPreview("");

      onClose();
    } catch (error) {
      console.error(
        "Create exercise error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Close
  // ==========================================

  const handleClose = () => {
    if (loading) return;

    setFormData(initialForm);
    setErrors({});
    setVideoPreview("");
    setThumbnailPreview("");

    onClose();
  };

  // ==========================================
  // Modal
  // ==========================================

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/70
          p-4
          backdrop-blur-sm
        "
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
      >
        <motion.form
          onSubmit={handleSubmit}
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 40,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            flex
            max-h-[92vh]
            w-full
            max-w-4xl
            flex-col
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-2xl

            dark:border-slate-700
            dark:bg-[#0F172A]
          "
        >
          {/* ====================================== */}
          {/* HEADER */}
          {/* ====================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              justify-between
              border-b
              border-gray-200
              px-8
              py-6

              dark:border-slate-700
            "
          >
            <div>
              <h2
                className="
                  flex
                  items-center
                  gap-3
                  text-2xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                <Dumbbell className="text-orange-500" />

                Create Exercise
              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-gray-500
                  dark:text-slate-400
                "
              >
                Add a new exercise to your
                fitness library.
              </p>
            </div>

            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="
                rounded-xl
                p-2
                text-gray-500
                transition
                hover:bg-gray-100
                hover:text-red-500
                disabled:cursor-not-allowed
                dark:hover:bg-slate-800
              "
            >
              <X size={22} />
            </button>
          </div>

          {/* ====================================== */}
          {/* BODY */}
          {/* ====================================== */}

          <div
            className="
              flex-1
              space-y-6
              overflow-y-auto
              p-8
            "
          >
            {/* ================================== */}
            {/* EXERCISE NAME */}
            {/* ================================== */}

            <div>
              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-semibold
                  text-gray-700
                  dark:text-gray-300
                "
              >
                Exercise Name *
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Barbell Squat"
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  outline-none
                  transition
                  focus:border-orange-500
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                "
              />

              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            {/* ================================== */}
            {/* DROPDOWNS */}
            {/* ================================== */}

            <div
              className="
                grid
                gap-5
                md:grid-cols-3
              "
            >
              {/* Muscle Group */}

              <div>
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  Muscle Group
                </label>

                <select
                  name="muscleGroup"
                  value={
                    formData.muscleGroup
                  }
                  onChange={handleChange}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    capitalize
                    outline-none
                    focus:border-orange-500
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                  "
                >
                  {muscleGroups.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item.replace(
                          "_",
                          " "
                        )}
                      </option>
                    )
                  )}
                </select>

                {errors.muscleGroup && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.muscleGroup}
                  </p>
                )}
              </div>

              {/* Equipment */}

              <div>
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  Equipment
                </label>

                <select
                  name="equipment"
                  value={
                    formData.equipment
                  }
                  onChange={handleChange}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    capitalize
                    outline-none
                    focus:border-orange-500
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                  "
                >
                  {equipments.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item.replace(
                          "_",
                          " "
                        )}
                      </option>
                    )
                  )}
                </select>

                {errors.equipment && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.equipment}
                  </p>
                )}
              </div>

              {/* Difficulty */}

              <div>
                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  Difficulty
                </label>

                <select
                  name="difficulty"
                  value={
                    formData.difficulty
                  }
                  onChange={handleChange}
                  className="
                    w-full
                    rounded-xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    capitalize
                    outline-none
                    focus:border-orange-500
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-white
                  "
                >
                  {difficulties.map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>

                {errors.difficulty && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.difficulty}
                  </p>
                )}
              </div>
            </div>

            {/* ================================== */}
            {/* CALORIES */}
            {/* ================================== */}

            <div>
              <label
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-gray-700
                  dark:text-gray-300
                "
              >
                <Flame size={16} />
                Calories Burn / Minute
              </label>

              <input
                type="number"
                min="0"
                name="caloriesBurnPerMinute"
                value={
                  formData.caloriesBurnPerMinute
                }
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  outline-none
                  focus:border-orange-500
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                "
              />

              {errors.caloriesBurnPerMinute && (
                <p className="mt-1 text-sm text-red-500">
                  {
                    errors.caloriesBurnPerMinute
                  }
                </p>
              )}
            </div>

            {/* ================================== */}
            {/* MEDIA UPLOAD */}
            {/* ================================== */}

            <div>
              <h3
                className="
                  mb-4
                  text-base
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                Exercise Media
              </h3>

              <div
                className="
                  grid
                  gap-5
                  md:grid-cols-2
                "
              >
                {/* Thumbnail */}

                <div>
                  <label
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    <ImageIcon size={16} />
                    Thumbnail
                  </label>

                  <label
                    className="
                      flex
                      min-h-[180px]
                      cursor-pointer
                      flex-col
                      items-center
                      justify-center
                      rounded-2xl
                      border-2
                      border-dashed
                      border-gray-300
                      bg-gray-50
                      p-4
                      text-center
                      transition
                      hover:border-orange-500
                      hover:bg-orange-50
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:hover:bg-orange-950/10
                    "
                  >
                    {thumbnailPreview ? (
                      <img
                        src={
                          thumbnailPreview
                        }
                        alt="Thumbnail preview"
                        className="
                          h-36
                          w-full
                          rounded-xl
                          object-cover
                        "
                      />
                    ) : (
                      <>
                        <ImageIcon
                          size={36}
                          className="
                            mb-3
                            text-gray-400
                          "
                        />

                        <span
                          className="
                            text-sm
                            font-semibold
                            text-gray-700
                            dark:text-gray-300
                          "
                        >
                          Upload Thumbnail
                        </span>

                        <span
                          className="
                            mt-1
                            text-xs
                            text-gray-500
                            dark:text-slate-400
                          "
                        >
                          JPG, PNG, WEBP
                        </span>
                      </>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        handleThumbnailChange
                      }
                      className="hidden"
                    />
                  </label>

                  {formData.thumbnail && (
                    <p
                      className="
                        mt-2
                        truncate
                        text-xs
                        text-gray-500
                        dark:text-slate-400
                      "
                    >
                      {formData.thumbnail.name}
                    </p>
                  )}

                  {errors.thumbnail && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.thumbnail}
                    </p>
                  )}
                </div>

                {/* Video */}

                <div>
                  <label
                    className="
                      mb-2
                      flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-gray-700
                      dark:text-gray-300
                    "
                  >
                    <Video size={16} />
                    Exercise Video
                  </label>

                  <label
                    className="
                      flex
                      min-h-[180px]
                      cursor-pointer
                      flex-col
                      items-center
                      justify-center
                      rounded-2xl
                      border-2
                      border-dashed
                      border-gray-300
                      bg-gray-50
                      p-4
                      text-center
                      transition
                      hover:border-orange-500
                      hover:bg-orange-50
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:hover:bg-orange-950/10
                    "
                  >
                    {videoPreview ? (
                      <video
                        src={videoPreview}
                        controls
                        className="
                          h-36
                          w-full
                          rounded-xl
                          object-cover
                        "
                      />
                    ) : (
                      <>
                        <Video
                          size={36}
                          className="
                            mb-3
                            text-gray-400
                          "
                        />

                        <span
                          className="
                            text-sm
                            font-semibold
                            text-gray-700
                            dark:text-gray-300
                          "
                        >
                          Upload Exercise Video
                        </span>

                        <span
                          className="
                            mt-1
                            text-xs
                            text-gray-500
                            dark:text-slate-400
                          "
                        >
                          MP4, MOV, WEBM
                        </span>
                      </>
                    )}

                    <input
                      type="file"
                      accept="video/*"
                      onChange={
                        handleVideoChange
                      }
                      className="hidden"
                    />
                  </label>

                  {formData.video && (
                    <p
                      className="
                        mt-2
                        truncate
                        text-xs
                        text-gray-500
                        dark:text-slate-400
                      "
                    >
                      {formData.video.name}
                    </p>
                  )}

                  {errors.video && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.video}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ================================== */}
            {/* DESCRIPTION */}
            {/* ================================== */}

            <div>
              <label
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-gray-700
                  dark:text-gray-300
                "
              >
                <FileText size={16} />
                Description
              </label>

              <textarea
                rows={4}
                name="description"
                value={
                  formData.description
                }
                onChange={handleChange}
                placeholder="Write exercise description..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  px-4
                  py-3
                  outline-none
                  focus:border-orange-500
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-white
                "
              />
            </div>

            {/* ================================== */}
            {/* INSTRUCTIONS */}
            {/* ================================== */}

            <div>
              <div
                className="
                  mb-4
                  flex
                  items-center
                  justify-between
                "
              >
                <label
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-gray-700
                    dark:text-gray-300
                  "
                >
                  <Target size={16} />
                  Instructions
                </label>

                <button
                  type="button"
                  onClick={addInstruction}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-lg
                    bg-orange-500
                    px-4
                    py-2
                    text-sm
                    font-medium
                    text-white
                    transition
                    hover:bg-orange-600
                  "
                >
                  <Plus size={16} />
                  Add Step
                </button>
              </div>

              <div className="space-y-3">
                {formData.instructions.map(
                  (
                    instruction,
                    index
                  ) => (
                    <div
                      key={index}
                      className="flex gap-3"
                    >
                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-orange-100
                          text-sm
                          font-bold
                          text-orange-600
                          dark:bg-orange-500/10
                          dark:text-orange-400
                        "
                      >
                        {index + 1}
                      </div>

                      <input
                        type="text"
                        value={instruction}
                        onChange={(e) =>
                          handleInstructionChange(
                            index,
                            e.target.value
                          )
                        }
                        placeholder={`Instruction ${
                          index + 1
                        }`}
                        className="
                          flex-1
                          rounded-xl
                          border
                          border-gray-300
                          bg-white
                          px-4
                          py-3
                          outline-none
                          focus:border-orange-500
                          dark:border-slate-700
                          dark:bg-slate-900
                          dark:text-white
                        "
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeInstruction(
                            index
                          )
                        }
                        disabled={
                          formData.instructions
                            .length === 1
                        }
                        className="
                          rounded-xl
                          bg-red-500
                          px-4
                          text-white
                          transition
                          hover:bg-red-600
                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
                      >
                        <Trash2
                          size={18}
                        />
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* ================================== */}
            {/* STATUS */}
            {/* ================================== */}

            <div
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-gray-200
                p-5
                dark:border-slate-700
              "
            >
              <div>
                <h3
                  className="
                    text-sm
                    font-semibold
                    text-gray-800
                    dark:text-white
                  "
                >
                  Exercise Status
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-gray-500
                    dark:text-slate-400
                  "
                >
                  Enable or disable this
                  exercise.
                </p>
              </div>

              <label
                className="
                  relative
                  inline-flex
                  cursor-pointer
                  items-center
                "
              >
                <input
                  type="checkbox"
                  name="isActive"
                  checked={
                    formData.isActive
                  }
                  onChange={handleChange}
                  className="peer sr-only"
                />

                <div
                  className="
                    relative
                    h-7
                    w-12
                    rounded-full
                    bg-gray-300
                    transition-all

                    after:absolute
                    after:left-1
                    after:top-1
                    after:h-5
                    after:w-5
                    after:rounded-full
                    after:bg-white
                    after:transition-all

                    peer-checked:bg-orange-500
                    peer-checked:after:translate-x-5
                  "
                />
              </label>
            </div>
          </div>

          {/* ====================================== */}
          {/* FOOTER */}
          {/* ====================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              justify-end
              gap-4
              border-t
              border-gray-200
              bg-gray-50
              px-8
              py-5

              dark:border-slate-700
              dark:bg-slate-900/40
            "
          >
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="
                rounded-xl
                border
                border-gray-300
                px-6
                py-3
                text-sm
                font-semibold
                text-gray-700
                transition
                hover:bg-gray-100
                disabled:cursor-not-allowed
                disabled:opacity-60
                dark:border-slate-600
                dark:text-gray-300
                dark:hover:bg-slate-800
              "
            >
              Cancel
            </button>

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              disabled={loading}
              type="submit"
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-red-700
                to-orange-500
                px-8
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                transition-all
                hover:shadow-orange-500/30
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              <Upload size={17} />

              {loading
                ? "Creating..."
                : "Create Exercise"}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </AnimatePresence>
  );
}