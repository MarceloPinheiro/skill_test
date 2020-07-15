class Exam < ApplicationRecord
  belongs_to :patient

  belongs_to :point_po, class_name: "Point", :foreign_key => 'point_po_id', dependent: :destroy
  belongs_to :point_or, class_name: "Point", :foreign_key => 'point_or_id', dependent: :destroy
  belongs_to :point_a, class_name: "Point", :foreign_key => 'point_n_id', dependent: :destroy
  belongs_to :point_n, class_name: "Point", :foreign_key => 'point_a_id', dependent: :destroy

  accepts_nested_attributes_for :point_po
  accepts_nested_attributes_for :point_or
  accepts_nested_attributes_for :point_n
  accepts_nested_attributes_for :point_a

  def maxillary_depth_angle
    return nil if self.point_po.x.nil? or self.point_po.y.nil? or self.point_or.x.nil? or self.point_or.y.nil? or self.point_n.x.nil? or self.point_n.y.nil? or self.point_a.x.nil? or self.point_a.y.nil?

    m1 = ((self.point_a.y - self.point_n.y)/(self.point_a.x - self.point_n.x))
    m2 = ((self.point_or.y - self.point_po.y)/(self.point_or.x - self.point_po.x))
    
    tgp = ((m2 - m1)/(1+(m2*m1)))
    tg = (tgp < 0 ? (tgp * (-1)) : (tgp))
    angulo = (Math::atan(tg)/(Math::PI/180))
    
    return (m1 > 0 ? (180 - angulo) : angulo)
    
  end

  def all_points

    pts = {
      "po" => {
        "x" => self.point_po.x,
        "y" => self.point_po.y
      },
      "or" => {
        "x" => self.point_or.x,
        "y" => self.point_or.y
      },
      "a" => {
        "x" => self.point_a.x,
        "y" => self.point_a.y
      },
      "n" => {
        "x" => self.point_n.x,
        "y" => self.point_n.y
      },
      "angle" => self.maxillary_depth_angle
    }
    return pts

  end
end
