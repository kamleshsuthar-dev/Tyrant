// // Category Controllers



// static async getCategoryById(req: Request, res: Response) {
//   try {
//     const category = await CategoryModel.findById(req.params.id);
//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }
//     res.status(200).json(category);
//   } catch (error) {
//     console.error("Get Category Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// }

// static async updateCategory(req: Request, res: Response) {
//   try {
//     const { name, description, parent } = req.body;
//     const category = await CategoryModel.findById(req.params.id);

//     if (!category) return res.status(404).json({ message: "Category not found" });

//     // Update basic fields
//     if (name) {
//       category.name = name;
//       category.slug = slugify(name, { lower: true });
//     }
//     if (description) category.description = description;

//     // Update parent and ancestors
//     if (parent && parent !== category.parent?.toString()) {
//       const parentCategory = await CategoryModel.findById(parent);
//       if (!parentCategory) {
//         return res.status(404).json({ message: "New parent category not found" });
//       }
//       category.parent = parent;
//       category.ancestors = [...(parentCategory.ancestors ?? []), parentCategory._id];
//     }

//     // Replace image if a new one is uploaded
//     if (req.file) {
//       if (category.image?.public_id) {
//         await deleteMedia(category.image.public_id, "image");
//       }
//       category.image = {
//         url: (req.file as any).path,
//         public_id: (req.file as any).filename,
//       };
//     }

//     await category.save();
//     res.status(200).json(category);
//   } catch (error) {
//     console.error("Update Category Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// }

// static async deleteCategory(req: Request, res: Response) {
//   try {
//     const category = await CategoryModel.findById(req.params.id);
//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     // Delete image from Cloudinary if exists
//     if (category.image?.public_id) {
//       await deleteMedia(category.image.public_id, "image");
//     }

//     await category.deleteOne();
//     res.status(200).json({ message: "Category deleted successfully" });
//   } catch (error) {
//     console.error("Delete Category Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// }

// static async toggleCategoryActiveStatus(req: Request, res: Response) {
//   try {
//     const category = await CategoryModel.findById(req.params.id);
//     if (!category) return res.status(404).json({ message: "Category not found" });

//     category.isActive = !category.isActive;
//     await category.save();

//     res.status(200).json({ message: `Category ${category.isActive ? 'enabled' : 'disabled'}` });
//   } catch (error) {
//     console.error("Toggle Active Status Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// }

