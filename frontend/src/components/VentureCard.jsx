import { useState } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';

export default function VentureCard({ venture }) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');

  const handleInvest = async () => {
    // Call payment API
    const res = await api.post('/payment/initialize', {
      email: user.email,
      amount: parseFloat(amount),
      ventureId: venture.id
    });
    window.location.href = res.data.data.authorization_url; // Redirect to Paystack
  };

  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <figure><img src={venture.image} alt={venture.title} className="h-48 object-cover" /></figure>
        <div className="card-body">
          <h2 className="card-title">{venture.title}</h2>
          <p>{venture.description.substring(0, 100)}...</p>
          <div className="flex justify-between items-center">
            <span className="text-primary font-bold">₦{venture.raised.toLocaleString()} raised</span>
            <button className="btn btn-primary" onClick={() => setIsOpen(true)}>Invest</button>
          </div>
        </div>
      </div>

      {/* Investment Modal */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogPanel className="p-6 bg-white rounded-lg shadow-xl">
          <h3 className="text-xl font-bold mb-4">Invest in {venture.title}</h3>
          <input
            type="number"
            placeholder="Amount (₦)"
            className="input input-bordered w-full mb-4"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button className="btn" onClick={() => setIsOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={handleInvest}>Pay Now</button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
}