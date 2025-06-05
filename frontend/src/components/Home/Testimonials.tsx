import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sophia Williams',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
    school: 'Computer Science, Stanford',
    quote: '"Thanks to ScholarHub, I secured the Women in STEM scholarship that covered 75% of my tuition. The platform made it easy to find and apply!"'
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
    school: 'Business, NYU',
    quote: '"As a first-generation college student, I was overwhelmed by the scholarship process. ScholarHub simplified everything and I won three scholarships!"'
  },
  {
    id: 3,
    name: 'Emma Chen',
    avatar: 'https://images.pexels.com/photos/3754438/pexels-photo-3754438.jpeg?auto=compress&cs=tinysrgb&w=100',
    school: 'Environmental Science, UCLA',
    quote: '"I\'d spent months searching for specific scholarships in my field with no luck. Within weeks of using ScholarHub, I found and won a perfect match!"'
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Student Success Stories
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Hear from students who found and won scholarships through our platform
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="h-16 w-16 rounded-full object-cover mr-4" 
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                  <p className="text-gray-600">{testimonial.school}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;