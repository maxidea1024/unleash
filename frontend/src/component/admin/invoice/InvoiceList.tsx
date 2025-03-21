import { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from '@mui/material';
import OpenInNew from '@mui/icons-material/OpenInNew';
import { PageContent } from 'component/common/PageContent/PageContent';
import { PageHeader } from 'component/common/PageHeader/PageHeader';
import { formatApiPath } from 'utils/formatPath';
import useInvoices from 'hooks/api/getters/useInvoices/useInvoices';
import type { IInvoice } from 'interfaces/invoice';
import { useLocationSettings } from 'hooks/useLocationSettings';
import { formatDateYMD } from 'utils/formatDate';

const PORTAL_URL = formatApiPath('api/admin/invoices/portal');

const InvoiceList = () => {
  const { refetchInvoices, invoices } = useInvoices();
  const [isLoaded, setLoaded] = useState(false);
  const { locationSettings } = useLocationSettings();

  useEffect(() => {
    refetchInvoices();
    setLoaded(true);
  }, []);

  return (
    <PageContent>
      {invoices.length > 0 ? (
        <>
          <PageHeader
            title='Invoices'
            actions={
              <Button
                href={PORTAL_URL}
                rel='noreferrer'
                target='_blank'
                endIcon={<OpenInNew />}
              >
                Billing portal
              </Button>
            }
          />
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Due date</TableCell>
                  <TableCell>PDF</TableCell>
                  <TableCell>Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoices.map((item: IInvoice) => (
                  <TableRow
                    key={item.invoiceURL}
                    style={{
                      backgroundColor:
                        item.status === 'past-due' ? 'error.dark' : 'inherit',
                    }}
                  >
                    <TableCell style={{ textAlign: 'left' }}>
                      {item.amountFormatted}
                    </TableCell>
                    <TableCell style={{ textAlign: 'left' }}>
                      {item.status}
                    </TableCell>
                    <TableCell style={{ textAlign: 'left' }}>
                      {item.dueDate &&
                        formatDateYMD(item.dueDate, locationSettings.locale)}
                    </TableCell>
                    <TableCell style={{ textAlign: 'left' }}>
                      <a href={item.invoicePDF}>PDF</a>
                    </TableCell>
                    <TableCell style={{ textAlign: 'left' }}>
                      <a
                        href={item.invoiceURL}
                        target='_blank'
                        rel='noreferrer'
                      >
                        Payment link
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        isLoaded && 'No invoices to show.'
      )}
    </PageContent>
  );
};

export default InvoiceList;
