import PageLayout from '@/components/PageLayout'
import Fields from '@/sections/Fields'
import SectionTitle from '@/sections/SectionTitle'

const mapping = [
  { field: '核电 / 电力', products: '防火防辐射封堵材料、核电用吸酸枕、硅布配套产品' },
  { field: '石油 / 化工', products: '双组分硅酮泡沫防火封堵材料、防火密封胶' },
  { field: '铁路 / 轨道交通', products: 'PTMU 5000 系列粘结剂、防火封堵材料' },
  { field: '高层建筑 / 造船', products: '单组份硅酮防火密封胶、阻火包、阻火模块' },
  { field: '低空飞行器 / 车辆', products: 'PTMU 1000–3000 系列复合材料粘结剂' },
  { field: '智慧矿山 / 仓储', products: '大宗物资自动盘点系统（激光雷达 + 点云软件）' },
]

export default function FieldsPage() {
  return (
    <PageLayout>
      <Fields />
      <section className="bg-[#F7F6F4] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            en="FIELD-PRODUCT MAPPING"
            title="领域与产品对照"
            desc="面向不同重大工程场景的产品选型指引"
            center
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mapping.map((m) => (
              <div key={m.field} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <h2 className="font-semibold text-ink">{m.field}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-gray">{m.products}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
