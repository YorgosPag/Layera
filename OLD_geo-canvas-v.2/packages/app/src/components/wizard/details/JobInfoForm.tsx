import React from 'react';
import { JobDetails, EmploymentType } from '@geo-platform/shared';

interface JobInfoFormProps {
    details: Partial<JobDetails>;
    onChange: (field: keyof JobDetails, value: string | number | EmploymentType) => void;
}

const JobInfoForm: React.FC<JobInfoFormProps> = ({ details, onChange }) => {
    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Τίτλος Θέσης <span className="text-red-500">*</span></label>
                <input
                    type="text"
                    id="jobTitle"
                    value={details.jobTitle || ''}
                    onChange={(e) => onChange('jobTitle', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="π.χ. Υπάλληλος Γραφείου"
                />
            </div>
            <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Εταιρεία (Προαιρετικό)</label>
                <input
                    type="text"
                    id="company"
                    value={details.company || ''}
                    onChange={(e) => onChange('company', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="π.χ. Geo-Solutions Α.Ε."
                />
            </div>
            <div>
                <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">Είδος Απασχόλησης <span className="text-red-500">*</span></label>
                <select
                    id="employmentType"
                    value={details.employmentType || ''}
                    onChange={(e) => onChange('employmentType', e.target.value as EmploymentType)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    <option value="">Επιλέξτε...</option>
                    <option value="full_time">Πλήρης Απασχόληση</option>
                    <option value="part_time">Μερική Απασχόληση</option>
                    <option value="freelance">Freelance / Project</option>
                    <option value="seasonal">Εποχιακή</option>
                    <option value="internship">Πρακτική Άσκηση</option>
                </select>
            </div>
             <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Μισθός (€ / μήνα)</label>
                <input
                    type="number"
                    id="salary"
                    value={details.salary || ''}
                    onChange={(e) => onChange('salary', e.target.value === '' ? '' : parseFloat(e.target.value))}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Αφήστε κενό για 'Συζητήσιμος'"
                />
            </div>
            <div>
                <label htmlFor="job-description" className="block text-sm font-medium text-gray-700">Περιγραφή Θέσης <span className="text-red-500">*</span></label>
                <textarea
                    id="job-description"
                    rows={5}
                    value={details.description || ''}
                    onChange={(e) => onChange('description', e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Περιγράψτε τα καθήκοντα, τις απαιτήσεις, κ.λπ."
                />
            </div>
        </div>
    );
};

export default JobInfoForm;