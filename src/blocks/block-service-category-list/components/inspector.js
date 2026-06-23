import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl, SelectControl, CheckboxControl, Spinner } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { store as coreStore } from "@wordpress/core-data";

const Inspector = (props) => {
	const { attributes, setAttributes } = props;
	const { parent_only, alternate_layout, order, orderBy, custom_categories } = attributes;

	const terms = useSelect((select) => {
		return select(coreStore).getEntityRecords("taxonomy", "service_category", {
			per_page: -1,
			hide_empty: false,
			orderby: "name",
			order: "asc",
		});
	}, []);

	const toggleCategory = (id, checked) => {
		const current = custom_categories || [];
		const next = checked
			? [...current, id]
			: current.filter((termId) => termId !== id);
		setAttributes({ custom_categories: next });
	};

	return (
		<InspectorControls>
			<PanelBody title="Danh mục">
				<ToggleControl
					label="Chỉ hiện danh mục cha"
					checked={parent_only}
					onChange={(value) => setAttributes({ parent_only: value })}
					help="Bật để chỉ lấy các danh mục cấp 1 (không có danh mục cha)."
					disabled={!!(custom_categories && custom_categories.length)}
				/>
				<ToggleControl
					label="Đảo chiều ảnh xen kẽ"
					checked={alternate_layout}
					onChange={(value) => setAttributes({ alternate_layout: value })}
					help="Bật để ảnh các card chẵn hiển thị bên trái thay vì bên phải."
				/>
			</PanelBody>
			<PanelBody title="Chọn danh mục tuỳ chỉnh" initialOpen={!!(custom_categories && custom_categories.length)}>
				{!terms && <Spinner />}
				{terms && (
					<>
						<p style={{ marginTop: 0 }}>
							Chọn các danh mục muốn hiển thị. Để trống sẽ dùng tuỳ chọn "Chỉ hiện danh mục cha" ở trên.
						</p>
						{terms.map((term) => (
							<CheckboxControl
								key={term.id}
								label={term.name}
								checked={(custom_categories || []).includes(term.id)}
								onChange={(checked) => toggleCategory(term.id, checked)}
							/>
						))}
					</>
				)}
			</PanelBody>
			<PanelBody title="Sắp xếp">
				<SelectControl
					label="Sắp xếp theo"
					value={orderBy}
					options={[
						{ label: "Thứ tự tuỳ chỉnh (term_order)", value: "term_order" },
						{ label: "Tên (A–Z)", value: "name" },
						{ label: "ID", value: "id" },
						{ label: "Số bài viết", value: "count" },
					]}
					onChange={(value) => setAttributes({ orderBy: value })}
				/>
				<SelectControl
					label="Chiều sắp xếp"
					value={order}
					options={[
						{ label: "Tăng dần (ASC)", value: "asc" },
						{ label: "Giảm dần (DESC)", value: "desc" },
					]}
					onChange={(value) => setAttributes({ order: value })}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
